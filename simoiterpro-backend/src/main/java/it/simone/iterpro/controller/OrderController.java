package it.simone.iterpro.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
}
