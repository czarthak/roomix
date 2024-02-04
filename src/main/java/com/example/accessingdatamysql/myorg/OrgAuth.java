package com.example.accessingdatamysql.myorg;

import jakarta.persistence.Entity;
import jakarta.persistence.NamedQuery;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin
@RestController // This means that this class is a Controller
@RequestMapping(path="/orgauth") // This means URL's start with /orgauth (after Application path)
public class OrgAuth {
//    @NamedQuery(
//            name="findAllCustomersWithName",
//            query="SELECT o FROM Organization o WHERE o.name LIKE :custName"
//    )
}
