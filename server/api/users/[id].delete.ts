import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
	const userId = getRouterParam(event, "id");

	return await prisma.user.delete({
		where: {
			id: parseInt(userId!),
		},
	});
});
