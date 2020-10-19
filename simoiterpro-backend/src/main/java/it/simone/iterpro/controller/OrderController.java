package it.simone.iterpro.controller;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.simone.iterpro.exception.DoesNotExistException;
import it.simone.iterpro.model.Order;
import it.simone.iterpro.service.OrderService;
import it.simone.iterpro.util.OrderFilter;


@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {
	
	@Autowired
	private OrderService orderService;

	@GetMapping("/")
	public String index() {    	
		return "it works";
	}
	
	@PostMapping("/orders")
	public Order createOrder(@RequestParam("userId") int userId, @Valid @RequestBody Order order) throws Exception {
		return orderService.createOrder(userId, order);
	}
	
	@GetMapping("/orders/{id}")
	public Order getOrder(@PathVariable int id) throws DoesNotExistException {
		return orderService.getOrder(id);
	}
	
	@GetMapping("/orders")
	public List<Order> searchOrder(@RequestParam("userId") int userId,
								   @RequestParam("minTotal") Optional<String> minTotal,
								   @RequestParam("maxTotal") Optional<String> maxTotal,
								   @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<Date> startDate,
								   @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<Date> endDate) {
		OrderFilter filter = new OrderFilter();
		
		filter.setUserId(userId);
		if (minTotal.isPresent())
			filter.setMinTotal(new BigDecimal(minTotal.get()));
		if (maxTotal.isPresent())
			filter.setMaxTotal(new BigDecimal(maxTotal.get()));
		if (startDate.isPresent())
			filter.setStartDate(startDate.get());
		if (endDate.isPresent())
			filter.setEndDate(endDate.get());
		
		return orderService.getOrderByFilters(filter);
	}
}
