import { Router, query } from "express";
import {
  textError,
  textResponse,
  checkTitleStatusArray,
  createNoteTaking,
  updateById,
  getAllData,
  getDataById,
  deleteById,
  deleteByTopic,
  textResponseObject,
  updateByTopic,
  getDataByTopic,
} from "./note-taking.service";

export const router = Router();

// ต้องการสร้าง อัปเดต ลบ ค้นหาตามสถานะหรือแท็ก

// สร้างข้อมูล
router.post("/noteTaking/create", async (req, res) => {
  try {
    const newNoteTaking = await createNoteTaking(req.body);
    res.send(`ข้อมูลที่ได้ดำเนินการสร้างมีดังนี้\n${newNoteTaking}`);
  } catch (error) {
    if (Array.isArray(req.body)) {
      await checkTitleStatusArray(res, req.body);
    } else if (!req.body.title)
      textError(res, 400, "กรุณาระบุข้อมูลในส่วนของ title ค่ะ");
    else if (!req.body.status)
      textError(res, 400, "กรุณาระบุข้อมูลในส่วนของ status ค่ะ");
    else textError(res, 500, error);
  }
});

// ดึงข้อมูลทั้งหมด
router.get("/noteTaking", async (req, res) => {
  try {
    const allData = await getAllData();
    res.send(allData);
  } catch (error) {
    textError(res, 500, error);
  }
});

// ดึงข้อมูลโดยอิงไอดี
router.get("/noteTaking/findById/:id", async (req, res) => {
  try {
    const data = await getDataById(req.params.id);
    res.send(data);
  } catch (error) {
    textError(res, 500, error);
  }
});

// ดึงข้อมูลโดยอิงจากการ query
router.get("/noteTaking/find", async (req, res) => {
  try {
    const resultObject = await getDataByTopic(req.query);
    res.send(resultObject);
  } catch (error) {
    textError(res, 500, error);
  }
});

// อัปเดตข้อมูลโดยอิงไอดี
router.patch("/noteTaking/update/:id", async (req, res) => {
  try {
    const resultUpdate = await updateById(req.params.id, req.body);
    textResponse(resultUpdate, res, req.params.id, "id", "อัปเดต");
  } catch (error) {
    textError(res, 500, error);
  }
});

// อัปเดตข้อมูลโดยอิงจากการ query
router.patch("/noteTaking/update", async (req, res) => {
  try {
    const resultObject = await updateByTopic(req.query, req.body);
    textResponseObject(resultObject.modifiedCount, res, req.query, "อัปเดต");
  } catch (error) {
    textError(res, 500, error);
  }
});

// ลบข้อมูลโดยอิงไอดี
router.delete("/noteTaking/delete/:id", async (req, res) => {
  try {
    const resultDelete = await deleteById(req.params.id);
    textResponse(resultDelete, res, req.params.id, "id", "ลบ");
  } catch (error) {
    textError(res, 500, error);
  }
});

// ลบข้อมูลโดยอิงจากการ query
router.delete("/noteTaking/delete", async (req, res) => {
  try {
    const resultObject = await deleteByTopic(req.query);
    textResponseObject(resultObject.deletedCount, res, req.query, "ลบ");
  } catch (error) {
    textError(res, 500, error);
  }
});
