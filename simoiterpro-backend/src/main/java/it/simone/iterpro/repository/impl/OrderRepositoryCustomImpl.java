package it.simone.iterpro.repository.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import it.simone.iterpro.model.Order;
import it.simone.iterpro.repository.OrderRepositoryCustom;
import it.simone.iterpro.util.OrderFilter;

@Repository
public class OrderRepositoryCustomImpl implements OrderRepositoryCustom{
	
    @PersistenceContext
    private EntityManager entityManager;

	@Override
	public List<Order> getListByFilters(OrderFilter filter) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Order> query = cb.createQuery(Order.class);
        
        Root<Order> order = query.from(Order.class);
        List<Predicate> predicates = new ArrayList<>();
        
        predicates.add(cb.equal(order.get("userId"), filter.getUserId()));
        
        if (filter.getStartDate() != null) {
            predicates.add(cb.greaterThan(order.get("creationDate"), filter.getStartDate()));
        }
        if (filter.getEndDate() != null) {
            predicates.add(cb.lessThan(order.get("creationDate"), filter.getEndDate()));
        }
        if (filter.getMinTotal() != null) {
            predicates.add(cb.greaterThan(order.get("total"), filter.getMinTotal()));
        }        
        if (filter.getMaxTotal() != null) {
            predicates.add(cb.lessThan(order.get("total"), filter.getMaxTotal()));
        }
        
        query.where(predicates.toArray(new Predicate[0]));
        
		return entityManager.createQuery(query).getResultList();
	}

	
}
