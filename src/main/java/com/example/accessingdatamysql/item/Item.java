package com.example.accessingdatamysql.item;


import jakarta.persistence.*;

@Entity
@Table(name = "ITEM")
public class Item {

    private String name;

    private String description;

    private String owner_email;

    private Integer quantity;

    public enum Category
    {
        STATIONERY,
        MARKETING,
        ELECTRONICS,
        SUPPLIES,
        PERISHABLES,
        MERCHANDISE,
        TOOLS,
        CHEMICALS,
        FLAMMABLE,
        OTHER,
        UNIQUE,
        BOOKS,
    }

    @Enumerated(EnumType.STRING)
    private Category category;

    public enum Status
    {
        AVAILABLE,
        BORROWED
    }
    @Enumerated(EnumType.STRING)
    private Status status;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer locationId;

    private Integer organizationId;

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

    public String getOwner_email() {
        return owner_email;
    }

    public void setOwner_email(String owner_email) {
        this.owner_email = owner_email;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getLocationId() {
        return locationId;
    }

    public void setLocationId(Integer locationId) {
        this.locationId = locationId;
    }

    public Integer getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Integer organizationId) {
        this.organizationId = organizationId;
    }
}
