package com.example.worknet.model;

import com.example.worknet.validation.annotation.ValidEmail;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.Hours;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "timesheets")
public class Timesheet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Size(max = 20)
    private Hours end;

    @NotBlank
    @Size(max = 20)
    private Hours start;

    @NotBlank
    @JsonIgnore
    @Lob
    private Date creationDate;





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

    public Hours getEnd() {
        return end;
    }

    public void setEnd(Hours end) {
        this.end = end;
    }

    public Hours getStart() {
        return start;
    }

    public void setStart(Hours start) {
        this.start = start;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
}