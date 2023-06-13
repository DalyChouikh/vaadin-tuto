package dev.daly.contacts.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    @Query(value = "select s from Contact as s where s.firstName like %:name% or s.lastName like %:name%")
    List<Contact> findContactsByNameContains(@Param("name") String name);


}
