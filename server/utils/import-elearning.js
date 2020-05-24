const xlsx = require("node-xlsx");
const db = require("../model/index");
const ELearning = db.ELearning;
const importElearning = async () => {
  let obj = xlsx.parse(__dirname + "/e-learning.xlsx");
  if (obj[0].data && obj[0].data.length > 0) {
    const filterData = obj[0].data
      .filter((f) => f.length > 0)
      .filter((_, idx) => idx !== 0)
      .filter((f2) => f2[0]);
    //   .map((item) => (item && item.trim()) || "");
    console.log(filterData[0]);

    for (let i = 0; i < filterData.length; i++) {
      const createELearning = await ELearning.create(
        {
          code: filterData[i][0],
          username: filterData[i][1] || "",
          title_th: filterData[i][2] || "",
          emp_name: filterData[i][3] || "",
          emp_surname: filterData[i][4] || "",
          firstname: filterData[i][5] || "",
          lastname: filterData[i][6] || "",
          position_code: filterData[i][7] || "",
          position_level: filterData[i][8] || "",
          position_name: filterData[i][9] || "",
          cost_center_code1: filterData[i][10] || "",
          dept_name1: filterData[i][11] || "",
          job_group_name1: filterData[i][12] || "",
          job_group_name2: filterData[i][13] || "",
          activity1: filterData[i][14] || "",
          cost_center_code2: filterData[i][16] || "",
          dept_name2: filterData[i][17] || "",
          job_group_name3: filterData[i][18] || "",
          job_group_name4: filterData[i][19] || "",
          activity2: filterData[i][20] || "",
          gender: filterData[i][21] || "",
          email: filterData[i][22] || "",
          birth_date: filterData[i][23] || "",
          hire_date: filterData[i][24] || "",
          personal_id: filterData[i][25] || "",
          status: filterData[i][26] || "",
          sup_code: filterData[i][27] || "",
          direct_sup: filterData[i][28] || "",
          area_code: filterData[i][29] || "",
          store_code: filterData[i][30] || "",
          store_th: filterData[i][31] || "",
          store_en: filterData[i][32] || "",
        }
        // { fields: ["code"] }
      );
      //   .then((res) => res.code);
    }
  }
};
module.exports = importElearning;
