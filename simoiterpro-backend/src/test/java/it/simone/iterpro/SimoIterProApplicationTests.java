package it.simone.iterpro;

import java.math.BigDecimal;
import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import it.simone.iterpro.model.Product;
import it.simone.iterpro.service.ProductService;

@SpringBootTest
class SimoIterProApplicationTests {
	
	@Autowired
	ProductService productService;

	@Test
	void contextLoads() {
	}
	
	@Test
	void testCreateProduct() {
		try {			
			productService.createProduct(simpleProduct());
			assert(true);
		} catch(Exception e) {
			System.err.println("Err :"+e);
			assert(false);
		}
	}
	
	@Test
	void testUpdateProduct() {
		try {			
			Product p = simpleProduct();
			p.setName("Air Max");
			p.setPrice(new BigDecimal(82));
			productService.updateProduct(1, p);
			assert(true);
		} catch(Exception e) {
			System.err.println("Err :"+e);
			assert(false);
		}
	}
	
	@Test
	void testDeleteProduct() {
		try {					
			productService.deleteProduct(1);
			assert(true);
		} catch(Exception e) {
			System.err.println("Err :"+e);
			assert(false);
		}
	}
	
	private Product simpleProduct() {
		Product p = new Product();
		p.setCreationDate(new Date());
		p.setName("Air Jordan B1");
		p.setDescription("Scarpe da Bambino");
		p.setPrice(new BigDecimal(90));
		return p;
	}

}
