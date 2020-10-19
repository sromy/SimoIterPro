package it.simone.iterpro.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import it.simone.iterpro.model.OrderItem;

@Repository
public interface OrderItemRepository extends CrudRepository<OrderItem, Integer>{

	
}
