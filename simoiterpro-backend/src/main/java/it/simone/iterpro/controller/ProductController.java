package it.simone.iterpro.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.simone.iterpro.exception.DoesNotExistException;
import it.simone.iterpro.model.Product;
import it.simone.iterpro.service.ProductService;
import it.simone.iterpro.util.ResponseEntity;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@GetMapping("/products/{id}")
	public Product getProduct(@PathVariable int id) throws DoesNotExistException  {
		return productService.getProduct(id);
	}
	
	@GetMapping("/products")
	public List<Product> getAllProducts() {
		return productService.getProducts();
	}
	
	@PostMapping("/products")
	public Product createProduct(@Valid @RequestBody Product product) {		
		return productService.createProduct(product);
	}
	
	@PutMapping("/products/{id}")
	public Product updateProduct(@PathVariable int id, @Valid @RequestBody Product product) throws DoesNotExistException {
		return productService.updateProduct(id, product);
	}
	
	@DeleteMapping("/products/{id}")
	public ResponseEntity deleteProduct(@PathVariable int id) throws DoesNotExistException  {		
		ResponseEntity result = new ResponseEntity();
		result.setOk(true);
		result.setMessage("Product correctly deleted!!!!");
		
        if (!productService.deleteProduct(id)) {
        	result.setOk(false);
    		result.setMessage("Unable to Delete Product : It could be related to an existing order!!!!");
        }

        return result;
	}

}
