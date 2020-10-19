package it.simone.iterpro.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import it.simone.iterpro.model.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer>{

	
}
