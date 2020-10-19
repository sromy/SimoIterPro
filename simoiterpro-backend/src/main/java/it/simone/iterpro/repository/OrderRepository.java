package it.simone.iterpro.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import it.simone.iterpro.model.Order;

@Repository
public interface OrderRepository extends CrudRepository<Order, Integer>{

	
}
