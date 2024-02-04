package com.example.accessingdatamysql.myorg;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name="OrganizationRoster")
public class OrganizationRoster {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer rosterId;

    private String userEmail;

    private Integer organizationId;

    public Integer getRosterId() {
        return rosterId;
    }

    public void setRosterId(Integer rosterId) {
        this.rosterId = rosterId;
    }

    public OrganizationRoster(String userEmail, Integer organizationId, Type type) {
        this.userEmail = userEmail;
        this.organizationId = organizationId;
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrganizationRoster that = (OrganizationRoster) o;
        return getRosterId().equals(that.getRosterId()) && userEmail.equals(that.userEmail) && organizationId.equals(that.organizationId) && type == that.type;
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRosterId(), userEmail, organizationId, type);
    }

    public OrganizationRoster() {
    }

    public enum Type {
        OWNER,
        MANAGER,
        MEMBER
    }
    @Enumerated(EnumType.STRING)
    private Type type;
}
