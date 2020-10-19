package it.simone.iterpro.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.apache.commons.lang3.builder.ToStringBuilder;

@Entity
@Table(name = "ORDER_HEADER")
public class Order {
	
	@Id
	@GeneratedValue (strategy = GenerationType.AUTO)
	@Column(name = "ORDER_ID")
	private int orderId;
	
	@Column(name = "CREATION_DATE")
	private Date creationDate;
	
	@Column(name = "USER_ID")
	private int userId;
	
	@OneToMany(mappedBy = "order")     
	private Set<OrderItem> items;

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Set<OrderItem> getItems() {
		return items;
	}

	public void setItems(Set<OrderItem> items) {
		this.items = items;
	}

	@Override
	public String toString() {		
		return ToStringBuilder.reflectionToString(this);		
	}
}
