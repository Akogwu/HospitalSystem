package edu.miu.HolyCross.Medical.controller;

import edu.miu.HolyCross.Medical.domain.Patient;
import edu.miu.HolyCross.Medical.service.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/patient")
@CrossOrigin(origins = "http://localhost:3000/")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public List<Patient> getAllPatients(){
        return patientService.getAllPatients();
    }

    @GetMapping("/older")
    public List<Patient> getOlderPatients(){
        return patientService.getOlderPatients();
    }

    @PostMapping
    public ResponseEntity<Patient> addPatient(@RequestBody Patient patient){
        patientService.addPatient(patient);
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }
    @PutMapping
    public ResponseEntity<Patient> updatePatientRecord(@RequestBody Patient patient){
        patientService.savePatient(patient);
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deletePatientRecord(@PathVariable Long id){
        patientService.deletePatientById(id);
    }
}
