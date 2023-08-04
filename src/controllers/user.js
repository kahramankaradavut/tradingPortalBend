const UserService = require('../services/user');

class UserController {
  async register(req, res) {
    try {
      await UserService.create(req.body);
      res.status(200).send({
        error: false,
        message: "Kullanıcı başarıyla eklendi!",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Kullanıcı eklenirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }
  async login(req, res) {
    try {
      const result = await UserService.login(req.body);
      if(result.length === 0) {
        res.status(404).send({
          error: true,
          message: "Kullanıcı bulunamadı!",
          result: null,
        });
      } else {
        res.status(200).send({
          error: false,
          message: "Kullanıcı başarıyla getirildi!",
          result: result[0],
        });
      }
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Kullanıcı getirilirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }
  async readUsers(req, res) {
    try {
      const result = await UserService.read();
      res.status(200).send({
        error: false,
        message: "Kullanıcılar başarıyla getirildi!",
        result: result,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Kullanıcılar getirilirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }
  async readUser(req, res) {
    try {
      const result = await UserService.read(req.params.userId);
      if(result.length === 0) {
        res.status(404).send({
          error: true,
          message: "Kullanıcı bulunamadı!",
          result: null,
        });
      } else {
        res.status(200).send({
          error: false,
          message: "Kullanıcı başarıyla getirildi!",
          result: result[0],
        });
      }
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Kullanıcı getirilirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }
  async updateUser(req, res) {
    try {
      await UserService.update(req.params.userId, req.body);
      res.status(200).send({
        error: false,
        message: "Kullanıcı başarıyla güncellendi!",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Kullanıcı güncellenirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }
  async deleteUser(req, res) {
    try {
      await UserService.delete(req.params.userId);
      res.status(200).send({
        error: false,
        message: "Kullanıcı başarıyla silindi!",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Kullanıcı silinirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }
}

module.exports = new UserController();
