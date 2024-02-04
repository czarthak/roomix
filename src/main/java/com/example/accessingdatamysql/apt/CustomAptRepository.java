package com.example.accessingdatamysql.apt;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CustomAptRepository {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public List<Object[]> getAptDescriptions(String email)
    {
        String query = "SELECT description, id FROM APT WHERE email = ?1";

        Query q = this.entityManager.createNativeQuery(query)
                .setParameter(1, email);
        return (List<Object[]>)q.getResultList();
    }
    @Transactional
    public boolean deleteApt(String email, String id)
    {
        String query = "DELETE FROM APT a WHERE a.email = ?1 AND a.id = ?2";

        Query q = this.entityManager.createNativeQuery(query)
                .setParameter(1, email)
                .setParameter(2, id);
        return q.executeUpdate() != 0;
    }

    @Transactional
    public Object publicApt(String email)
    {
        String query = "SELECT fname, lname, phone_number, year, budget, personal_trait, major FROM USER u WHERE u.email = ?1";
        Query q = this.entityManager.createNativeQuery(query)
                .setParameter(1, email);
        return q.getSingleResult();
    }

}
