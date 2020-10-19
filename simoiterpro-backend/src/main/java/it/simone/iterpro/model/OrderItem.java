package it.simone.iterpro.model;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.apache.commons.lang3.builder.ToStringBuilder;

@Entity
@Table(name = "ORDER_ITEM")
public class OrderItem {

	@Id
	@Column(name = "ORDER_ITEM_ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int orderItemId;
	
	@Column(name = "ORDER_ID")
	private int orderId; 
	
	@Column(name = "PRICE")
	private BigDecimal price;
	
	@Column(name = "QUANTITY")
	private BigDecimal quantity;
	
	@ManyToOne
	@JoinColumn(name = "PRODUCT_ID", referencedColumnName = "PRODUCT_ID", nullable = false)
	private Product product;

	public int getOrderItemId() {
		return orderItemId;
	}

	public void setOrderItemId(int orderItemId) {
		this.orderItemId = orderItemId;
	}		

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public BigDecimal getQuantity() {
		return quantity;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	public Product getProduct() {
		return product;
	}		

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public void setProduct(Product product) {
		this.product = product;
	}
	
	@Override
	public String toString() {		
		return ToStringBuilder.reflectionToString(this);		
	}
}
