package com.example.accessingdatamysql.item;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CustomItemRepository {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public List<Object[]> getAllItems(Integer orgId)
    {
        String nativeQuery = "SELECT I.*, L.location FROM ITEM I JOIN LOCATION L ON I.location_id = L.location_id WHERE I.organization_id = :orgId";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter("orgId", orgId);

        @SuppressWarnings("unchecked")
        List<Object[]> resultList = query.getResultList();

        return resultList;
    }

    @Transactional
    public Object getItem(Integer orgId, Integer itemId)
    {
        try
        {
            String nativeQuery = "SELECT I.*, L.location FROM ITEM I JOIN LOCATION L ON I.location_id = L.location_id WHERE I.organization_id = :orgId AND I.item_id = :itemId";
            Query query = entityManager.createNativeQuery(nativeQuery)
                    .setParameter("orgId", orgId)
                    .setParameter("itemId", itemId);
            return query.getSingleResult();
        }
        catch (Exception e)
        {
            return "Item Not Found";
        }


    }

    @Transactional
    public Object deleteItem(Integer itemId)
    {
        String nativeQuery = "DELETE FROM ITEM I WHERE I.item_id = :itemId";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter("itemId", itemId);
        return query.executeUpdate();
    }

    @Transactional
    public List<Object> getLocation(Integer orgId)
    {
        String nativeQuery = "SELECT L.location, L.location_id FROM LOCATION L WHERE L.organization_id = :orgId";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter("orgId", orgId);
        return query.getResultList();
    }
    @Transactional
    public List<Object[]> getLocationCount(Integer orgId)
    {
        String nativeQuery = "SELECT l.location, COUNT(i.item_id) AS item_count " +
                "FROM LOCATION l " +
                "LEFT JOIN ITEM i ON l.location_id = i.location_id " +
                "WHERE l.organization_id = :orgId " +
                "GROUP BY l.location";

        Query query = entityManager.createNativeQuery(nativeQuery);
        query.setParameter("orgId", orgId);

        @SuppressWarnings("unchecked")
        List<Object[]> resultRows = query.getResultList();
        return resultRows;
    }

    @Transactional
    public List<Object[]> getAvailableItemCategoryCount(Integer orgId) {
        String nativeQuery = "SELECT i.category, SUM(i.quantity) AS available_count " +
                "FROM ITEM i " +
                "WHERE i.organization_id = :orgId AND i.status = 'AVAILABLE' " +
                "GROUP BY i.category";

        Query query = entityManager.createNativeQuery(nativeQuery);
        query.setParameter("orgId", orgId);

        @SuppressWarnings("unchecked")
        List<Object[]> resultRows = query.getResultList();

        return resultRows;
    }

    @Transactional
    public List<Object[]> getBorrowedItemCategoryCount(Integer orgId) {
        String nativeQuery = "SELECT i.category, SUM(i.quantity) AS borrowed_count " +
                "FROM ITEM i " +
                "WHERE i.organization_id = :orgId AND i.status = 'BORROWED' " +
                "GROUP BY i.category";

        Query query = entityManager.createNativeQuery(nativeQuery);
        query.setParameter("orgId", orgId);

        @SuppressWarnings("unchecked")
        List<Object[]> resultRows = query.getResultList();

        return resultRows;
    }

    @Transactional
    public Object deleteLocation(Integer locationId)
    {
        String nativeQuery = "DELETE FROM LOCATION L WHERE L.location_id = :locationId";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter("locationId", locationId);
        return query.executeUpdate();
    }

    @Transactional
    public Object createLocation(String locationName, Integer orgId)
    {
        String nativeQuery = "INSERT INTO LOCATION(location, organization_id) VALUES (:locationName, :orgId)";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter("locationName", locationName)
                .setParameter("orgId", orgId);
        return query.executeUpdate();
    }
    @Transactional
    public Object updateItem(Map<String, Object> json)
    {
        // Extract parameters from the JSON map
        Integer itemId;
        if (json.get("itemId") instanceof Integer)
            itemId = (Integer) json.get("itemId");
        else {
            itemId = Integer.parseInt((String)json.get("itemId"));
        }
        Integer quantity;
        if (json.get("quantity") instanceof Integer)
            quantity = (Integer) json.get("quantity");
        else {
            quantity = Integer.parseInt((String)json.get("quantity"));
        }
        Integer locationId;
        if (json.get("locationId") instanceof Integer)
            locationId = (Integer) json.get("locationId");
        else {
            locationId = Integer.parseInt((String)json.get("locationId"));
        }
        String status = (String) json.get("status");
        String description = (String) json.get("description");
        String category = (String) json.get("category");
        String name = (String) json.get("name");
        // Use native SQL query with EntityManager to update the item
        String nativeQuery = "UPDATE ITEM SET status = ?1, description = ?2, quantity = ?3, category = ?4, name = ?5, location_id = ?6 WHERE item_id = ?7";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter(1, status)
                .setParameter(2, description)
                .setParameter(3, quantity)
                .setParameter(4, category)
                .setParameter(5, name)
                .setParameter(6, locationId)
                .setParameter(7, itemId);

        int updatedRows = query.executeUpdate();

        return updatedRows > 0;
    }
    @Transactional
    public Object createItem(Map<String, Object> json)
    {
        // Extract parameters from the JSON map
        Integer orgId;
        if (json.get("orgId") instanceof Integer)
            orgId = (Integer) json.get("orgId");
        else {
            orgId = Integer.parseInt((String)json.get("orgId"));
        }
        Integer quantity;
        if (json.get("quantity") instanceof Integer)
            quantity = (Integer) json.get("quantity");
        else {
            quantity = Integer.parseInt((String)json.get("quantity"));
        }
        Integer locationId;
        if (json.get("locationId") instanceof Integer)
            locationId = (Integer) json.get("locationId");
        else {
            locationId = Integer.parseInt((String)json.get("locationId"));
        }
        String status = (String) json.get("status");
        String description = (String) json.get("description");
        String category = (String) json.get("category");
        String name = (String) json.get("name");
        // Use native SQL query with EntityManager to update the item
        // Use native SQL query with EntityManager to create a new item
        String ownerEmail = (String) entityManager.createNativeQuery("SELECT O.email FROM ORGANIZATION O WHERE O.organization_id = :orgId").setParameter("orgId", orgId).getSingleResult();
        String nativeQuery = "INSERT INTO ITEM (name, description, owner_email, quantity, category, status, location_id, organization_id) " +
                "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter(1, name)
                .setParameter(2, description)
                .setParameter(3, ownerEmail)
                .setParameter(4, quantity)
                .setParameter(5, category)
                .setParameter(6, status)
                .setParameter(7, locationId)
                .setParameter(8, orgId);
        int updatedRows = query.executeUpdate();
        return updatedRows > 0;
    }
}
