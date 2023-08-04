const TransactionService = require('../services/transaction');

class TransactionController {
  async createTransaction(req, res) {
    try {
      await TransactionService.create(req.body);
      res.status(200).send({
        error: false,
        message: "İşlem başarıyla yapıldı!",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "İşlem yapılırken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }


  async readTransactions(req, res) {
    try {
      const result = await TransactionService.read();
      res.status(200).send({
        error: false,
        message: "İşlemler başarıyla yapıldı!",
        result: result,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "İşlemler yapılırken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }


  async readTransaction(req, res) {
    try {
      const result = await TransactionService.read(req.params.transactionId);
      if(result.length === 0) {
        res.status(404).send({
          error: true,
          message: "Geçersiz işlem!",
          result: null,
        });
      } else {
        res.status(200).send({
          error: false,
          message: "İşlem başarıyla yapıldı!",
          result: result[0],
        });
      }
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "İşlem yapılırken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }


  async readUserTransactions(req, res) {
    try {
      const result = await TransactionService.readUserTransactions(req.params.userId);
      res.status(200).send({
        error: false,
        message: "Kullanıcının işlemleri başarıyla yapıldı!",
        result: result,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Kullanıcının işlemleri yapılırken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }


  async updateTransaction(req, res) {
    try {
      await TransactionService.update(req.params.transactionId, req.body);
      res.status(200).send({
        error: false,
        message: "İşlem başarıyla güncellendi!",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "İşlem güncellenirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }


  async deleteTransaction(req, res) {
    try {
      await TransactionService.delete(req.params.transactionId);
      res.status(200).send({
        error: false,
        message: "İşlem başarıyla silindi!",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "İşlem silinirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }
}

module.exports = new TransactionController();
