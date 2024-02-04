package com.example.accessingdatamysql;

import jakarta.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "USER")
public class User {

    private String fname;

    private String lname;

    private String password;

    private String phoneNumber;

    private String year;

    private String major;

    private String bio;

    private String budget;

    private String personalTrait;

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    // Getter for bio
    public String getBio() {
        return bio;
    }

    // Setter for bio
    public void setBio(String bio) {
        this.bio = bio;
    }


    // Getter for budget
    public String getBudget() {
        return budget;
    }

    // Setter for budget
    public void setBudget(String budget) {
        this.budget = budget;
    }

    // Getter for personalTrait
    public String getPersonalTrait() {
        return personalTrait;
    }

    // Setter for personalTrait
    public void setPersonalTrait(String personalTrait) {
        this.personalTrait = personalTrait;
    }

    @Id
    @Column(nullable = false)
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}