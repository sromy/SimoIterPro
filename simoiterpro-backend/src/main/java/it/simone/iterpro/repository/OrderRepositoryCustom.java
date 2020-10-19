package it.simone.iterpro.repository;

import java.util.List;

import it.simone.iterpro.model.Order;
import it.simone.iterpro.util.OrderFilter;


public interface OrderRepositoryCustom {

	public List<Order> getListByFilters(OrderFilter filter);
}
