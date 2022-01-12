package edu.miu.HolyCross.Medical.repository;

import edu.miu.HolyCross.Medical.domain.Patient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends CrudRepository<Patient,Long> {
    List<Patient> findAll();
}
