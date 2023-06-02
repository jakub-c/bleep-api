import { serveDir } from "https://deno.land/std@0.184.0/http/file_server.ts";
import { serve } from "https://deno.land/std@0.184.0/http/server.ts";
import {
  ServerSentEvent,
  ServerSentEventStreamTarget,
} from "https://deno.land/std@0.188.0/http/server_sent_event.ts";
import { connect } from "https://deno.land/x/redis/mod.ts";

import { load } from "https://deno.land/std/dotenv/mod.ts";

import { nextArrayIndex } from "./public/lib/nextArrayIndex.mjs";
import { colors } from "./public/lib/colors.mjs";

const env = await load();

const redisSub = await connect({
  hostname: Deno.env.get("ENDPOINT") || env["ENDPOINT"],
  port: Deno.env.get("PORT") || env["PORT"],
  password: Deno.env.get("PASSWORD") || env["PASSWORD"],
});

const redisPub = await connect({
  hostname: Deno.env.get("ENDPOINT") || env["ENDPOINT"],
  port: Deno.env.get("PORT") || env["PORT"],
  password: Deno.env.get("PASSWORD") || env["PASSWORD"],
});

const STREAM_ROUTE = new URLPattern({ pathname: "/stream{/}?" });
const PUBLIC_ROUTE = new URLPattern({ pathname: "/public/*" });
const NOTE_ROUTE = new URLPattern({ pathname: "/:channel/:note{/}?" });
const COLOR_ROUTE = new URLPattern({ pathname: "/color{/}?" });

redisSub.subscribe("channel").then(async (sub) => {
  for await (const { message } of sub.receive()) {
    dispatchEvent(
      new CustomEvent("noteTrigger", {
        detail: message,
      }),
    );
  }
});

async function handler(req: Request): Response {
  const streamMatch = STREAM_ROUTE.exec(req.url);
  const publicMatch = PUBLIC_ROUTE.exec(req.url);
  const noteMatch = NOTE_ROUTE.exec(req.url);
  const colorMatch = COLOR_ROUTE.exec(req.url);

  if (streamMatch) {
    // STREAM ROUTE
    console.log("requesting stream");
    const target = new ServerSentEventStreamTarget();

    addEventListener("noteTrigger", (e) => {
      const evt = new ServerSentEvent(
        "message",
        { data: e.detail },
      );
      target.dispatchEvent(evt);
    });

    return target.asResponse();
  } else if (publicMatch) {
    // PUBLIC ROUTE
    return serveDir(req, {
      fsRoot: "public",
      urlRoot: "public",
    });
  } else if (noteMatch) {
    // NOTE ROUTE
    const soundRequest = {
      channel: noteMatch.pathname.groups.channel,
      note: noteMatch.pathname.groups.note,
    };

    redisPub.publish("channel", JSON.stringify(soundRequest));

    return new Response(
      `got the note ${soundRequest.note} on channel ${soundRequest.channel}`,
    );
  } else if (colorMatch) {
    // COLOR ROUTE
    const colorIndex: number = Number(await redisPub.get("colorIndex")) || 0;
    await redisPub.set("colorIndex", nextArrayIndex(colorIndex, colors));
    return new Response(JSON.stringify(colors[colorIndex]));
  }

  return new Response("howdy");
}

serve(handler);
