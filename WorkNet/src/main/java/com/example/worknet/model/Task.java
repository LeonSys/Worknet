package com.example.worknet.model;

import com.example.worknet.validation.annotation.ValidEmail;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


@NoArgsConstructor
//@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Size(max = 20)
    private String name;

    @NotBlank
    @Size(max = 20)
    private String priority;

   /* @NotBlank
    //@Size(max = 20)
    @JsonIgnore
    @Lob
    private Date creationDate;*/

    @NotBlank
    @Size(max = 200)
    private String description;

    @Size(max = 20)
    private String status;

    @Column(nullable = true)
    private Date deadline;

    private String assignedUser;

    public Task(long id, String name, String priority, String description, String status, Date deadline, String assignedUser) {
        this.id = id;
        this.name = name;
        this.priority = priority;
        this.description = description;
        this.status = status;
        this.deadline = deadline;
        this.assignedUser = assignedUser;
    }



    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", priority='" + priority + '\'' +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", deadline=" + deadline +
                ", assignedUser='" + assignedUser + '\'' +
                '}';
    }

/* @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "user_roles",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "roles_id"))
    private Set<Role> roles = new HashSet<>();*/



//    public User( String email, String username, String password) {
//        this.email = email;
//        this.username = username;
//        this.password = password;
//    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }



    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public String getAssignedUser() {
        return assignedUser;
    }

    public void setAssignedUser(String assignedUser) {
        this.assignedUser = assignedUser;
    }
}