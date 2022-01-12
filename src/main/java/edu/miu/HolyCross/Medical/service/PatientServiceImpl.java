package edu.miu.HolyCross.Medical.service;

import edu.miu.HolyCross.Medical.domain.Patient;
import edu.miu.HolyCross.Medical.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService{

    private final PatientRepository patientRepository;

    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }


    @Override
    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public List<Patient> getOlderPatients() {
        return patientRepository.findAll()
                .stream().filter( patient -> Period.between(patient.getDateOfBirth(), LocalDate.now()).getYears() > 3).collect(Collectors.toList());
    }

    @Override
    public void deletePatientById(Long id) {
        patientRepository.deleteById(id);
    }
}
