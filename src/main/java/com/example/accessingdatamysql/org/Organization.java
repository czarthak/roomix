package com.example.accessingdatamysql.org;


import jakarta.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "ORGANIZATION")
public class Organization {

     public enum Category {
         ACADEMIC,
         RECREATION,
         TECHNOLOGY,
         POLITICS,
         GREEKLIFE
     }

     @Enumerated(EnumType.STRING)
     private Category category;

//    private String category;

    private Integer memberCount;

    private String name;

    private String email;

    private String ownerEmail;

    private String description;

    // public Category getCategory() {
    //     return category;
    // }

    // public void setCategory(Category category) {
    //     this.category = category;
    // }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Integer getMemberCount() {
        return memberCount;
    }

    public void setMemberCount(Integer membercount) {
        this.memberCount = membercount;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    @Id
    @Column(name="organizationId")
    @GeneratedValue(strategy=GenerationType.IDENTITY)   
    private Integer organizationId;

    public int getOrgId() {
        return organizationId;
    }

    public void setOrgId(Integer orgId) {
        this.organizationId = orgId;
    }

}