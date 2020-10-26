package it.simone.iterpro.util;

import java.math.BigDecimal;
import java.util.Date;

public class OrderFilter {

	private String userId;
	private Date startDate;
	private Date endDate;
	private BigDecimal minTotal;
	private BigDecimal maxTotal;
			
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public BigDecimal getMinTotal() {
		return minTotal;
	}
	public void setMinTotal(BigDecimal minTotal) {
		this.minTotal = minTotal;
	}
	public BigDecimal getMaxTotal() {
		return maxTotal;
	}
	public void setMaxTotal(BigDecimal maxTotal) {
		this.maxTotal = maxTotal;
	}
		
}
