package com.example.accessingdatamysql.myorg;

import com.example.accessingdatamysql.org.Organization;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;

@Entity
public class OrgUserType {

    @Id
    private String ownerEmail;

    @Enumerated(EnumType.STRING)
    private Organization.Category category;

    private Integer memberCount;

    private String name;

    private String email;

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    private String description;

    private String userEmail;
    @Enumerated(EnumType.STRING)
    private OrganizationRoster.Type type;

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    public Organization.Category getCategory() {
        return category;
    }

    public void setCategory(Organization.Category category) {
        this.category = category;
    }

    public Integer getMemberCount() {
        return memberCount;
    }

    public void setMemberCount(Integer memberCount) {
        this.memberCount = memberCount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public OrganizationRoster.Type getType() {
        return type;
    }

    public void setType(OrganizationRoster.Type type) {
        this.type = type;
    }
}
