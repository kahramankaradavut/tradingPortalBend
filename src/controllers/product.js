const ProductService = require('../services/product');

class ProductController {
  async createProduct(req, res) {
    try {
      await ProductService.create(req.body);
      res.status(200).send({
        error: false,
        message: "Ürün başarıyla eklendi!",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Ürün eklenirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async readProduct(req, res) {
    try {
      const result = await ProductService.read(req.params.productId);
      if(result.length === 0) {
        res.status(404).send({
          error: true,
          message: "Ürün bulunamadı!",
          result: null,
        });
      } else {
        res.status(200).send({
          error: false,
          message: "Ürün başarıyla getirildi!",
          result: result[0],
        });
      }
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Ürün getirilirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async readProducts(req, res) {
    try {
      const result = await ProductService.readAll();
      res.status(200).send({
        error: false,
        message: "Ürünler başarıyla getirildi!",
        result: result,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Ürünler getirilirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async readUserOffers(req, res) {
    try {
      const result = await ProductService.readUserOffers(req.params.userId);
      res.status(200).send({
        error: false,
        message: "Teklifleriniz başarıyla getirildi!",
        result: result,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Teklifleriniz getirilirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async readUserOfferHistory(req, res) {
    try {
      const result = await ProductService.readUserOfferHistory(req.params.userId);
      res.status(200).send({
        error: false,
        message: "Teklif geçmişiniz başarıyla getirildi!",
        result: result,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Teklif geçmişiniz getirilirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async createProductOffer(req, res) {
    try {
      await ProductService.createProductOffer(req.params.productId, req.body.productIds);
      res.status(200).send({
        error: false,
        message: "Ürüne başarıyla teklif yapıldı!",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Ürüne teklif yapılırken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async replyToOffer(req, res) {
    try {
      await ProductService.replyToOffer(req.body.offeringProductId, req.body.offeredProductIds, req.body.status);
      if(req.body.status === 'accepted'){
        // await ProductService.swapUserIds(req.body.offeringProductId, req.body.offeredProductIds);
        await ProductService.updateSwappedProductStatus(req.body.offeringProductId, req.body.offeredProductIds);
      }
      res.status(200).send({
        error: false,
        message: "Teklife başarıyla cevap verdiniz!",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Teklife cevap verilirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async readUserProducts(req, res) {
    try {
      const result = await ProductService.readUserProducts(req.params.userId);
      res.status(200).send({
        error: false,
        message: "Kullanıcının ürünleri başarıyla getirildi!",
        result: result,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Kullanıcının ürünleri getirilirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async readUserFavoriteProducts(req, res) {
    try {
      const result = await ProductService.readUserFavoriteProducts(req.params.userId);
      res.status(200).send({
        error: false,
        message: "Kullanıcının beğendiği ürünler başarıyla getirildi!",
        result: result,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Kullanıcının beğendiği ürünler getirilirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      await ProductService.update(req.params.productId, req.body);
      res.status(200).send({
        error: false,
        message: "Ürün başarıyla güncellendi!",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Ürün güncellenirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async likeProduct(req, res) {
    try {
      await ProductService.like(req.params.productId, req.body.userId);
      res.status(200).send({
        error: false,
        message: "Ürünü başarıyla beğendiniz!",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Ürünü beğenirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async unlikeProduct(req, res) {
    try {
      await ProductService.unlike(req.params.productId, req.body.userId);
      res.status(200).send({
        error: false,
        message: "",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Beklenmedik bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async deleteCommentProduct(req, res) {
    try {
      await ProductService.deleteComment(req.params.commentId);
      res.status(200).send({
        error: false,
        message: "",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Beklenmedik bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async commentProduct(req, res) {
    try {
      await ProductService.comment(req.params.productId, req.body);
      res.status(200).send({
        error: false,
        message: "Ürüne başarıyla yorum yaptınız!",
        result: null,
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).send({
        error: true,
        message: "Ürüne yorum yaparken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      await ProductService.delete(req.params.productId);
      res.status(200).send({
        error: false,
        message: "Ürün başarıyla silindi!",
        result: null,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Ürün silinirken bir hata oluştu!",
        result: error.sqlMessage,
      });
    }
  }
}

module.exports = new ProductController();
