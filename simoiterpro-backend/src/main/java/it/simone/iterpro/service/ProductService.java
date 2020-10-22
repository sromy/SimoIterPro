package it.simone.iterpro.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.simone.iterpro.exception.DoesNotExistException;
import it.simone.iterpro.model.Product;
import it.simone.iterpro.repository.ProductRepository;

@Service
public class ProductService {
	
	private final Logger logger = LoggerFactory.getLogger(ProductService.class);

	@Autowired
	private ProductRepository productRepository;
	
	public List<Product> getProducts() {
		List<Product> list = new ArrayList<>();
		productRepository.findAll().forEach(e -> list.add(e));
		return list;
	}
	
	public Product getProduct(int id) throws DoesNotExistException {
		Optional<Product> product = productRepository.findById(id);
		if (!product.isPresent()) {
			logger.warn("Product ["+id+"] not found!!");
			throw new DoesNotExistException("Product");
		}
		return product.get();
	}
	
	public Product createProduct(Product product) {
		product.setCreationDate(new Date());
		return productRepository.save(product);
	}
	
	public Product updateProduct(int productId, Product product) throws DoesNotExistException {
		Product savedProduct = this.getProduct(productId);
		product.setProductId(productId);
		product.setCreationDate(savedProduct.getCreationDate());
		return productRepository.save(product);
	}
	
	public boolean deleteProduct(int productId){	
		boolean result = false;
		try {
			if (productRepository.existsById(productId)) {
				productRepository.delete(this.getProduct(productId));
				result = true;
			} else  {
				result = false;
			}
		} catch(Exception e) {
			logger.error("Error in deleteProduct ["+productId+"] : ",e);
			result = false;
		}
		return result;
	}
	
	
}
