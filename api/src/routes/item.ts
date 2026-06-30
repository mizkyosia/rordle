import { eq, sql } from "drizzle-orm";
import { db, schema } from "../db";
import { Router } from "express";

const router = Router();

router.get('/', async (_, res) => {
    return res.json({ success: true, data: await db.select().from(schema.item) });
});

router.get('/:id', async (req, res) => {
    const [item] = await db.select()
        .from(schema.item)
        .where(eq(schema.item.id, parseInt(req.params.id)));

    if (!item) return res.json({ success: false, error: "Invalid item ID" });

    return res.json({
        success: true,
        data: item
    });
});

router.get('/random', async (_, res) => {
    const [item] = (await db.select()
        .from(schema.item)
        .orderBy(sql`random()`).limit(1));

    return res.json({ success: true, data: item });
});

export default router;