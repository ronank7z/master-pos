import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	return await prisma.user.update({
		where: {
			id: body.id,
		},
		data: body.data,
	});
});
