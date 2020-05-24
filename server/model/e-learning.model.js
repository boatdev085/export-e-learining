module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("e_learning_export", {
    code: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    title_th: {
      type: Sequelize.STRING,
    },
    emp_name: {
      type: Sequelize.STRING,
    },
    emp_surname: {
      type: Sequelize.STRING,
    },
    title_en: {
      type: Sequelize.STRING,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    position_code: {
      type: Sequelize.STRING,
    },
    position_level: {
      type: Sequelize.STRING,
    },
    position_name: {
      type: Sequelize.STRING,
    },
    cost_center_code1: {
      type: Sequelize.STRING,
    },
    dept_name1: {
      type: Sequelize.STRING,
    },
    job_group_name1: {
      type: Sequelize.STRING,
    },
    job_group_name2: {
      type: Sequelize.STRING,
    },
    activity1: {
      type: Sequelize.STRING,
    },
    cost_center_code2: {
      type: Sequelize.STRING,
    },
    dept_name2: {
      type: Sequelize.STRING,
    },
    job_group_name3: {
      type: Sequelize.STRING,
    },
    job_group_name4: {
      type: Sequelize.STRING,
    },
    activity2: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    birth_date: {
      type: Sequelize.STRING,
    },
    hire_date: {
      type: Sequelize.STRING,
    },
    personal_id: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    sup_code: {
      type: Sequelize.STRING,
    },
    direct_sup: {
      type: Sequelize.STRING,
    },
    area_code: {
      type: Sequelize.STRING,
    },
    store_code: {
      type: Sequelize.STRING,
    },
    store_th: {
      type: Sequelize.STRING,
    },
    store_en: {
      type: Sequelize.STRING,
    },
  });

  return Users;
};
