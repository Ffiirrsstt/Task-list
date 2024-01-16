import { noteTakingModel } from "../../models/note-taking.model";

const removeBrace = (dataObject) => {
  return Object.entries(dataObject).map(
    ([key, value]) => `"${key}":"${value}"`
  );
};

export const textError = (res, number, error) => res.status(number).send(error);

export const textResponse = (result, res, data, topic, text) => {
  if (result === null || result === 0) {
    res.status(400).send(`ขออภัย, ไม่มีข้อมูลของ "${topic}" : "${data}"`);
    return;
  }
  res.send(
    `ดำเนินการ${text}ข้อมูลที่มีรายละเอียด "${topic}" : "${data}" เรียบร้อยแล้ว`
  );
};

export const textResponseObject = (result, res, dataObject, text) => {
  if (result === null || result === 0) {
    res.status(400).send(`ขออภัย, ไม่มีข้อมูลของ ${removeBrace(dataObject)}`);
    return;
  }
  res.send(
    `ดำเนินการ${text}ข้อมูลที่มีรายละเอียด ${removeBrace(
      dataObject
    )} เรียบร้อยแล้ว`
  );
};

export const checkTitleStatusArray = (res, dataArray) => {
  for (const data of dataArray) {
    if (!data.title) {
      textError(res, 400, "กรุณาระบุข้อมูลในส่วนของ title ค่ะ");
      return;
    } else if (!data.status) {
      textError(res, 400, "กรุณาระบุข้อมูลในส่วนของ status ค่ะ");
      return;
    }
  }
};

export const createNoteTaking = (noteTakingData) => {
  if (Array.isArray(noteTakingData)) {
    const result = noteTakingData.map((data) => noteTakingModel(data).save());
    return Promise.all(result);
  }
  return noteTakingModel(noteTakingData).save();
};

export const getAllData = () => noteTakingModel.find({});

export const getDataById = (id) => noteTakingModel.findById({ _id: id });

export const getDataByTopic = (dataObject) => noteTakingModel.find(dataObject);

export const updateById = (id, noteTakingData) =>
  noteTakingModel.findByIdAndUpdate(id, noteTakingData);

export const updateByTopic = (dataOject, dataUpdate) =>
  noteTakingModel.updateMany(dataOject, dataUpdate);

export const deleteById = (id) => noteTakingModel.findByIdAndRemove(id);

export const deleteByTopic = (dataOject) =>
  noteTakingModel.deleteMany(dataOject);
