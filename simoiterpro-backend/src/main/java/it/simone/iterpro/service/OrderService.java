package it.simone.iterpro.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.simone.iterpro.exception.DoesNotExistException;
import it.simone.iterpro.model.Order;
import it.simone.iterpro.model.OrderItem;
import it.simone.iterpro.model.Product;
import it.simone.iterpro.repository.OrderRepository;
import it.simone.iterpro.util.OrderFilter;

@Service
public class OrderService {

	private final Logger logger = LoggerFactory.getLogger(OrderService.class);
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private ProductService productService;
	
	@Transactional
	public Order createOrder(int userId, Order order) throws Exception {
		
		Order neworder = new Order();
		neworder.setUserId(userId);
		neworder.setCreationDate(new Date());
		
		// inserimento Testata Ordine
		neworder = orderRepository.save(neworder);
								
		// inserimento Dettaglio Ordine
		Set<OrderItem> newitems = new HashSet<OrderItem>();
		BigDecimal totalOrder = new BigDecimal(0);
		for (OrderItem item : order.getItems()) {
		    item.setOrderId(neworder.getOrderId());
		    Product p = productService.getProduct(item.getProduct().getProductId());
		    item.setProduct(p);
		    item.setPrice(p.getPrice());
		    newitems.add(item);
		    totalOrder = totalOrder.add(item.getPrice().multiply(item.getQuantity()));
		}
		neworder.setTotal(totalOrder);
		neworder.setItems(newitems);
		
		return orderRepository.save(neworder);
	}
	
	public Order getOrder(int id) throws DoesNotExistException {
		Optional<Order> order = orderRepository.findById(id);
		if (!order.isPresent()) {
			logger.warn("Warning OrderId ["+id+"] not exist");
			throw new DoesNotExistException("Order");
		}
		return order.get();
	}
	
	public List<Order> getOrderByFilters(OrderFilter filter) {
		return orderRepository.getListByFilters(filter);
	}
}
