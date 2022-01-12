package edu.miu.HolyCross.Medical.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   private String patientNumber;
   private boolean isAnOutPatient;
   private String fullNames;
   private String emailAddress;
   private String contactPhoneNumber;
   private LocalDate dateOfBirth;

   @Transient
   private int age;

}
