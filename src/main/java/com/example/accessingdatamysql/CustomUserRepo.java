package com.example.accessingdatamysql;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomUserRepo {

    @Autowired
    private EntityManager entityManager;

    // Existing methods...

    @Transactional
    public List<Object[]> getAllUsers() {
        String nativeQuery = "SELECT u.email, u.fname, u.lname, u.phoneNumber, u.year, u.major, u.bio, u.existingApart, u.preferApart, u.budget, u.personalTrait FROM USER u";
        Query query = entityManager.createNativeQuery(nativeQuery);
        @SuppressWarnings("unchecked")
        List<Object[]> resultList = query.getResultList();
        return resultList;
    }

    // Update or create new methods as necessary without involving the password field...
}
