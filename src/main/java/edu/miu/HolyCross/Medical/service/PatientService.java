package edu.miu.HolyCross.Medical.service;

import edu.miu.HolyCross.Medical.domain.Patient;

import java.util.List;

public interface PatientService {
    Patient addPatient(Patient patient);
    Patient savePatient(Patient patient);
    List<Patient> getAllPatients();
    List<Patient> getOlderPatients();
    void deletePatientById(Long id);

}
