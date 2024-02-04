package com.example.accessingdatamysql.org;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CustomOrganizationRepository
{
    @Autowired
    private EntityManager entityManager;


    @Transactional
    public List<Object[]> countOrganizationsByCategory()
    {
        String query = "SELECT category, COUNT(*) FROM Organization GROUP BY category";
        Query q = this.entityManager.createNativeQuery(query);
        return (List<Object[]>)q.getResultList();
    }

    @Transactional
    public List<Object[]> countOrganizationsByMemberCount()
    {
        String query = "SELECT category, SUM(member_count) AS total_members FROM ORGANIZATION GROUP BY category;";
        Query q = this.entityManager.createNativeQuery(query);
        return (List<Object[]>)q.getResultList();
    }

}