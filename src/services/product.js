const db = require("../scripts/database");

class ProductService {
  async create(data) {
    const result = await db.query(
      `INSERT INTO products 
        (title, description, image, status, user_id) 
        VALUES 
        ('${data.title}', '${data.description}', '${data.image}', 'active', '${data.userId}')`
    );
    return result.info;
  }

  async createProductOffer(
    productId,
    ids
  ) {
    const values = ids.map(
      (id) =>
        `('pending', '${productId}', '${id}')`
    );

    const result = await db.query(
      `INSERT INTO product_offers (status, offering_product_id, offered_product_id)
      VALUES ${values.join(", ")}`
    );

    return result.info;
  }

  async readUserOffers(userId) {
    const result = await db.query(
      `SELECT
      p1.id AS product_id,
      p1.title,
      p1.description,
      p1.image,
      p1.created_at,
      p1.updated_at,
      JSON_OBJECT(
        'id', u.id,
        'firstName', u.first_name,
        'lastName', u.last_name,
        'email', u.email,
        'phoneNumber', u.phone_number
      ) AS user,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', p2.id,
          'image', p2.image,
          'title', p2.title,
          'created_at', p2.created_at,
          'updated_at', p2.updated_at,
          'description', p2.description
        )
      ) AS offered_products
    FROM
      products AS p1
    JOIN
      product_offers AS po ON po.offering_product_id = p1.id
    JOIN
      products AS p2 ON po.offered_product_id = p2.id
    JOIN
      users AS u ON p2.user_id = u.id
    WHERE
      p1.user_id = '${userId}' AND po.status = 'pending'
    GROUP BY
      p1.id, p1.title, p1.description, p1.image, p1.created_at, p1.updated_at, u.id, u.first_name, u.last_name;`
    );

    return result;
  }

  async readUserOfferHistory(userId) {
    const result = await db.query(
      `SELECT
      p1.id AS product_id,
      p1.title,
      p1.description,
      p1.image,
      p1.created_at,
      p1.updated_at,
      JSON_OBJECT(
        'id', u.id,
        'firstName', u.first_name,
        'lastName', u.last_name,
        'email', u.email,
        'phoneNumber', u.phone_number
      ) AS user,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', p2.id,
          'image', p2.image,
          'title', p2.title,
          'created_at', p2.created_at,
          'updated_at', p2.updated_at,
          'description', p2.description
        )
      ) AS offered_products
    FROM
      products AS p1
    JOIN
      product_offers AS po ON po.offering_product_id = p1.id
    JOIN
      products AS p2 ON po.offered_product_id = p2.id
    JOIN
      users AS u ON p2.user_id = u.id
    WHERE
      p1.user_id = '${userId}' AND po.status = 'accepted'
    GROUP BY
      p1.id, p1.title, p1.description, p1.image, p1.created_at, p1.updated_at, u.id, u.first_name, u.last_name;`
    );

    return result;
  }

  async read(id) {
    const result = await db.query(
      `SELECT
      p.id,
      p.title,
      p.description,
      p.image,
      p.created_at,
      p.updated_at,
      JSON_OBJECT(
          'id', u.id,
          'firstName', u.first_name,
          'lastName', u.last_name,
          'email', u.email,
          'phoneNumber', u.phone_number
      ) AS user,
      CASE
          WHEN COUNT(c.id) > 0 THEN
              JSON_ARRAYAGG(
                  JSON_OBJECT(
                      'id', c.id,
                      'comment', c.comment,
                      'createdAt', c.created_at,
                      'updatedAt', c.updated_at,
                      'user', JSON_OBJECT(
                          'id', uc.id,
                          'firstName', uc.first_name,
                          'lastName', uc.last_name,
                          'email', uc.email,
                          'phoneNumber', uc.phone_number
                      )
                  )
              )
          ELSE
              JSON_ARRAY()
      END AS comments,
      CASE
          WHEN COUNT(f.id) > 0 THEN
              JSON_ARRAYAGG(
                  JSON_OBJECT(
                      'id', uf.id,
                      'firstName', uf.first_name,
                      'lastName', uf.last_name,
                      'email', uf.email,
                      'phoneNumber', uf.phone_number
                  )
              )
          ELSE
              JSON_ARRAY()
      END AS likes
  FROM
      products p
  JOIN
      users u ON p.user_id = u.id
  LEFT JOIN
      comments c ON p.id = c.product_id
  LEFT JOIN
      users uc ON c.user_id = uc.id
  LEFT JOIN
      favorites f ON p.id = f.product_id
  LEFT JOIN
      users uf ON f.user_id = uf.id
  WHERE
      p.id = '${id}'
  GROUP BY
      p.id, u.id, u.first_name, u.last_name, u.email, u.phone_number;`
    );
    return result;
  }

  async readAll() {
    const result = await db.query(
      `SELECT
      p.id,
      p.title,
      p.description,
      p.image,
      p.created_at,
      p.updated_at,
      JSON_OBJECT(
          'id', u.id,
          'firstName', u.first_name,
          'lastName', u.last_name,
          'email', u.email,
          'phoneNumber', u.phone_number
      ) AS user,
      CASE
          WHEN COUNT(c.id) > 0 THEN
              JSON_ARRAYAGG(
                  JSON_OBJECT(
                      'id', c.id,
                      'comment', c.comment,
                      'createdAt', c.created_at,
                      'updatedAt', c.updated_at,
                      'user', JSON_OBJECT(
                          'id', uc.id,
                          'firstName', uc.first_name,
                          'lastName', uc.last_name,
                          'email', uc.email,
                          'phoneNumber', uc.phone_number
                      )
                  )
              )
          ELSE
              JSON_ARRAY()
      END AS comments,
      CASE
          WHEN COUNT(f.id) > 0 THEN
              JSON_ARRAYAGG(
                  JSON_OBJECT(
                      'id', uf.id,
                      'firstName', uf.first_name,
                      'lastName', uf.last_name,
                      'email', uf.email,
                      'phoneNumber', uf.phone_number
                  )
              )
          ELSE
              JSON_ARRAY()
      END AS likes
  FROM
      products p
  JOIN
      users u ON p.user_id = u.id
  LEFT JOIN
      comments c ON p.id = c.product_id
  LEFT JOIN
      users uc ON c.user_id = uc.id
  LEFT JOIN
      favorites f ON p.id = f.product_id
  LEFT JOIN
      users uf ON f.user_id = uf.id
  WHERE
    p.status = 'active'
  GROUP BY
      p.id, u.id, u.first_name, u.last_name, u.email, u.phone_number;`
    );
    return result;
  }

  async readUserProducts(userId) {
    const result = await db.query(
      `SELECT
      p.id,
      p.title,
      p.description,
      p.image,
      p.created_at,
      p.updated_at,
      JSON_OBJECT(
          'id', u.id,
          'firstName', u.first_name,
          'lastName', u.last_name,
          'email', u.email,
          'phoneNumber', u.phone_number
      ) AS user,
      CASE
          WHEN COUNT(c.id) > 0 THEN
              JSON_ARRAYAGG(
                  JSON_OBJECT(
                      'id', c.id,
                      'comment', c.comment,
                      'createdAt', c.created_at,
                      'updatedAt', c.updated_at,
                      'user', JSON_OBJECT(
                          'id', uc.id,
                          'firstName', uc.first_name,
                          'lastName', uc.last_name,
                          'email', uc.email,
                          'phoneNumber', uc.phone_number
                      )
                  )
              )
          ELSE
              JSON_ARRAY()
      END AS comments,
      CASE
          WHEN COUNT(f.id) > 0 THEN
              JSON_ARRAYAGG(
                  JSON_OBJECT(
                      'id', uf.id,
                      'firstName', uf.first_name,
                      'lastName', uf.last_name,
                      'email', uf.email,
                      'phoneNumber', uf.phone_number
                  )
              )
          ELSE
              JSON_ARRAY()
      END AS likes
  FROM
      products p
  JOIN
      users u ON p.user_id = u.id
  LEFT JOIN
      comments c ON p.id = c.product_id
  LEFT JOIN
      users uc ON c.user_id = uc.id
  LEFT JOIN
      favorites f ON p.id = f.product_id
  LEFT JOIN
      users uf ON f.user_id = uf.id
  WHERE
      p.user_id = '${userId}'
  GROUP BY
      p.id, u.id, u.first_name, u.last_name, u.email, u.phone_number;`
    );
    return result;
  }

  async readUserFavoriteProducts(userId) {
    const result = await db.query(
        `SELECT 
          JSON_OBJECT(
              'id', p.id,
              'title', p.title,
              'description', p.description,
              'created_at', p.created_at,
              'updated_at', p.updated_at
          ) AS product,
          f.created_at,
          f.updated_at
          FROM favorites f
          JOIN products p ON f.product_id = p.id
          WHERE f.user_id = '${userId}'`
    );
    return result;
  }

  async update(id, data) {
    const queries = [];

    Object.keys(data).map((item) => {
      switch (item) {
        case "title":
          queries.push(
            `title='${data.title}'`
          );
          break;
        case "description":
          queries.push(
            `description='${data.description}'`
          );
          break;
        case "image":
          queries.push(
            `image='${data.image}'`
          );
          break;
        case "userId":
          queries.push(
            `user_id='${data.userId}'`
          );
          break;
        case "status":
          queries.push(
            `status='${data.status}'`
          );
          break;
        default:
          break;
      }
    });

    const result = await db.query(
      `UPDATE 
        products
        SET
        ${queries.join(",")}
        WHERE id='${id}'`
    );

    return result;
  }

  async replyToOffer(offeringProductId, offeredProductIds, status) {
    const offeredProductIdsString = offeredProductIds.join(",");

    const query = `
      UPDATE product_offers
      SET status='${status}'
      WHERE offering_product_id=${offeringProductId}
      AND offered_product_id IN (${offeredProductIdsString})
    `;
  
    const result = await db.query(query);
    
    return result;
  }

  // async swapUserIds(offeringProductId, offeredProductIds) {
  //   const offeringProductQuery = `
  //     SELECT user_id
  //     FROM products
  //     WHERE id = ${offeringProductId}
  //   `;
  //   const offeringProductResult = await db.query(offeringProductQuery);
  //   const offeringProductUserId = offeringProductResult[0].user_id;

  //   const offeredProductQuery = `
  //     SELECT user_id
  //     FROM products
  //     WHERE id = ${offeredProductIds[0]}
  //   `;
  //   const offeredProductResult = await db.query(offeredProductQuery);
  //   const offeredProductUserId = offeredProductResult[0].user_id;

  //   await this.update(offeringProductId, {userId: offeredProductUserId})

  //   offeredProductIds.forEach(async id => {
  //     await this.update(id, {userId: offeringProductUserId})
  //   });
    
  //   return {};
  // }  
  
  async updateSwappedProductStatus(offeringProductId, offeredProductIds) {
    await this.update(offeringProductId, {status: 'inactive'})

    offeredProductIds.forEach(async id => {
      await this.update(id, {status: 'inactive'})
    });
    
    return {};
  } 

  async like(productId, userId) {
    const result = await db.query(
      `INSERT INTO favorites 
        (product_id, user_id) 
        VALUES 
        ('${productId}', '${userId}')`
    );
    return result.info;
  }

  async unlike(productId, userId) {
    const result = await db.query(
      `DELETE FROM favorites 
      WHERE product_id='${productId}' AND user_id='${userId}'`
    );

    return result.info;
  }

  async comment(productId, data) {
    const result = await db.query(
      `INSERT INTO comments 
        (product_id, user_id, comment) 
        VALUES 
        ('${productId}', '${data.userId}', '${data.comment}')`
    );
    return result.info;
  }

  async deleteComment(commentId) {
    const result = await db.query(
      `DELETE FROM comments 
      WHERE id='${commentId}'`
    );

    return result.info;
  }

  async delete(id) {
    const result = await db.query(
      `DELETE FROM products 
        WHERE id='${id}'`
    );

    return result.info;
  }
}

module.exports = new ProductService();
