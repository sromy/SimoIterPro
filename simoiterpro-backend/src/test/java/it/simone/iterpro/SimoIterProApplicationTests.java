package it.simone.iterpro;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import it.simone.iterpro.model.Order;
import it.simone.iterpro.model.OrderItem;
import it.simone.iterpro.model.Product;
import it.simone.iterpro.service.OrderService;
import it.simone.iterpro.service.ProductService;

@SpringBootTest
class SimoIterProApplicationTests {
	
	@Autowired
	ProductService productService;
	
	@Autowired
	OrderService orderService;

	@Test
	void contextLoads() {
	}
	
	@Test
	void testCreateProduct() {
		try {			
			productService.createProduct(simpleProduct1());
			assert(true);
		} catch(Exception e) {
			System.err.println("Err :"+e);
			assert(false);
		}
	}
	
	@Test
	void testUpdateProduct() {
		try {			
			Product p = simpleProduct1();
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
	
	@Test
	void testCreateOrder() {
		try {			
			orderService.createOrder(1, simpleOrder());
			assert(true);
		} catch(Exception e) {
			System.err.println("Err :"+e);
			assert(false);
		}
	}
	
	private Product simpleProduct1() {
		Product p = new Product();
		p.setName("Air Jordan B1");
		p.setDescription("Scarpe da Bambino");
		p.setPrice(new BigDecimal(90));
		return p;
	}
	
	private Product simpleProduct2() {
		Product p = new Product();
		p.setName("Geox");
		p.setDescription("Scarpe da Adulto");
		p.setPrice(new BigDecimal(90));
		return p;
	}
	
	private Order simpleOrder() throws Exception {		
		Order o = new Order();
		OrderItem i1 = new OrderItem();i1.setProduct(productService.getProduct(1));i1.setQuantity(new BigDecimal(2));
		OrderItem i2 = new OrderItem();i2.setProduct(productService.getProduct(2));i2.setQuantity(new BigDecimal(5));
		Set<OrderItem> items = new HashSet<OrderItem>();
		items.add(i1);items.add(i2);
		o.setItems(items);			
		
		return o;
	}

}
