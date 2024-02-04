package com.example.accessingdatamysql.request;

import com.example.accessingdatamysql.item.Item;
import com.example.accessingdatamysql.myorg.OrganizationRoster;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class CustomRequestRepository {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public List<Object> getRequests(Integer orgId)
    {
        String nativeQuery = "SELECT R.* FROM REQUEST R WHERE R.organization_id = :orgId";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter("orgId", orgId);
        return query.getResultList();
    }
    @Transactional
    public List<Object[]> findUserRequests(String userEmail)
    {
        String nativeQuery = "SELECT r.status, r.description, o.name, " +
                "r.type, r.request_id, r.quantity, i.name " +
                "FROM REQUEST r " +
                "JOIN ORGANIZATION o ON r.organization_id = o.organization_id " +
                "LEFT JOIN ITEM i ON r.item_id = i.item_id " +
                "WHERE r.user_email = :userEmail";

        Query query = entityManager.createNativeQuery(nativeQuery);
        query.setParameter("userEmail", userEmail);

        @SuppressWarnings("unchecked")
        List<Object[]> resultRows = query.getResultList();

        return resultRows;
    }

    @Transactional
    public Object createItemRequest(@RequestBody Map<String, Object> json)
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
        Integer itemId;
        if (json.get("itemId") instanceof Integer)
            itemId = (Integer) json.get("itemId");
        else {
            itemId = Integer.parseInt((String)json.get("itemId"));
        }
        String description = (String) json.get("description");
        String userEmail = (String) json.get("userEmail");
        // Use native SQL query with EntityManager to create a new request
        String nativeQuery = "INSERT INTO REQUEST (user_email, organization_id, status, quantity, type, description, item_id) " +
                "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter(1, userEmail)
                .setParameter(2, orgId)
                .setParameter(3, "PENDING")
                .setParameter(4, quantity)
                .setParameter(5, "ITEM")
                .setParameter(6, description)
                .setParameter(7, itemId);
        int updatedRows = query.executeUpdate();
        return updatedRows > 0;
    }

    @Transactional
    public Object createJoinRequest(@RequestBody Map<String, Object> json)
    {
// Extract parameters from the JSON map
        Integer orgId;
        if (json.get("orgId") instanceof Integer)
            orgId = (Integer) json.get("orgId");
        else if (json.get("orgId") instanceof HashMap<?,?>)
            orgId = Integer.parseInt((String)((HashMap)json.get("orgId")).get("orgId"));
        else {
            orgId = Integer.parseInt((String)json.get("orgId"));
        }
        String description = (String) json.get("description");
        String userEmail = (String) json.get("userEmail");
        // Use native SQL query with EntityManager to create a new request
        String nativeQuery = "INSERT INTO REQUEST (user_email, organization_id, status, type, description) " +
                "VALUES (?1, ?2, ?3, ?4, ?5)";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter(1, userEmail)
                .setParameter(2, orgId)
                .setParameter(3, "PENDING")
                .setParameter(4, "JOIN")
                .setParameter(5, description);
        int updatedRows = query.executeUpdate();
        return updatedRows > 0;
    }
    @Transactional
    public Object updateRequest(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> result = new HashMap<>();
        //this is basically just for join type requests
        Integer requestId;
        if (json.get("requestId") instanceof Integer)
            requestId = (Integer) json.get("requestId");
        else
            requestId = Integer.parseInt((String) json.get("requestId"));
        Integer orgId;
        if (json.get("orgId") instanceof Integer)
            orgId = (Integer) json.get("orgId");
        else
            orgId = Integer.parseInt((String) json.get("orgId"));
        String nativeQuery = "UPDATE REQUEST r SET status = ?1 WHERE r.request_id = ?2";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter(1, json.get("status"))
                .setParameter(2, requestId);
        query.executeUpdate();
//        System.out.println(json.entrySet());
        if (json.get("status").equals("ACCEPTED"))
        {
            String getQuery = "SELECT r.* FROM REQUEST r WHERE r.request_id = ?1";
            Query getq = entityManager.createNativeQuery(getQuery, Request.class)
                    .setParameter(1, requestId);
            Request request = (Request) getq.getSingleResult();
//            System.out.println(objectList.get(0));
//            System.out.println(request.toString());
//            System.out.println(userEmail);
            if (request.getType() == Request.Type.JOIN) {
                String insertQuery = "INSERT INTO ORGANIZATION_ROSTER(user_email, organization_id, type) VALUES(?1, ?2, ?3)";
                Query inq = entityManager.createNativeQuery(insertQuery)
                        .setParameter(1, request.getUserEmail())
                        .setParameter(2, orgId)
                        .setParameter(3, "MEMBER");
                String memberCount = "UPDATE ORGANIZATION o SET member_count = member_count + 1 WHERE o.organization_id = ?1";
                Query memberQ = entityManager.createNativeQuery(memberCount)
                        .setParameter(1, orgId);
                inq.executeUpdate();
                //add the user as a member to the organization
                memberQ.executeUpdate(); //update member count
                result.put("member", "added successfully");
            }
            else
            {
                String getItemQuery = "SELECT i.quantity FROM ITEM i WHERE i.item_id = ?1";
                Query itemQuery = entityManager.createNativeQuery(getItemQuery, Integer.class)
                        .setParameter(1, request.getItem_id());
                Integer itemQuantity = (Integer) itemQuery.getSingleResult();
                if (itemQuantity <= request.getQuantity())
                {
                    // if it's greater just give them everything.
                    String itemUpdateQuery = "UPDATE ITEM i SET status = 'BORROWED', owner_email=?2 WHERE i.item_id = ?1";
                    Query iuQuery = entityManager.createNativeQuery(itemUpdateQuery)
                            .setParameter(1, request.getItem_id())
                            .setParameter(2, request.getUserEmail());
                    iuQuery.executeUpdate();
                }
                else
                {
                    String itemUpdateQuery = "UPDATE ITEM i SET quantity = ?1 WHERE i.item_id = ?2"; //reduce quantity
                    Query iuQuery = entityManager.createNativeQuery(itemUpdateQuery)
                            .setParameter(1, (itemQuantity - request.getQuantity()))
                            .setParameter(2, request.getItem_id());
                    iuQuery.executeUpdate(); //update the item to be less quantity in available state
                    String getItemAllQuery = "SELECT i.* FROM ITEM i WHERE i.item_id = ?1";
                    Query getItemAllQ = entityManager.createNativeQuery(getItemAllQuery, Item.class)
                            .setParameter(1, request.getItem_id());
                    Item existingItem = (Item) getItemAllQ.getSingleResult();
                    String itemInsertQuery = "INSERT INTO ITEM(name, description, owner_email, quantity, category, status, location_id, organization_id) "
                            + "VALUES(?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)";
                    Query iQuery = entityManager.createNativeQuery(itemInsertQuery)
                            .setParameter(1, existingItem.getName())
                            .setParameter(2, existingItem.getDescription())
                            .setParameter(3, request.getUserEmail())
                            .setParameter(4, request.getQuantity())
                            .setParameter(5, existingItem.getCategory().name())
                            .setParameter(6, "BORROWED")
                            .setParameter(7, existingItem.getLocationId())
                            .setParameter(8, existingItem.getOrganizationId());
                    iQuery.executeUpdate();
                }
            }
        }
        return query.executeUpdate() > 0;
    }
}
