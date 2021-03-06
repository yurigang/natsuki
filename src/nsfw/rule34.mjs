import nsfw from "../lib/nsfw.mjs";
import query from "../lib/query.mjs";
import sample from "../lib/sample.mjs";
import score from "../lib/score.mjs";
import typing from "../lib/typing.mjs";

import fetch from "node-fetch";
import xml2js from "xml2js";

export const rule34 = nsfw(typing(async (message, content) =>
{
	const response = await fetch(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${query(content)}`);
	const posts = (await xml2js.parseStringPromise(await response.text())).posts.post;
	return await message.channel.send(posts ? score(sample(posts).$) : `No image found for \`${content}\` on https://rule34.xxx/`);
}));

export const r34 = rule34;
