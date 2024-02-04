package com.example.accessingdatamysql.myorg;

import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface OrgRosterRepository extends CrudRepository<OrganizationRoster, Integer>{
}
