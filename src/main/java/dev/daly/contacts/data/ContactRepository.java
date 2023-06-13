package dev.daly.contacts.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    @Query(value = "select c from Contact as c where lower(c.firstName) like lower(concat('%', :name, '%'))" +
            " or lower(c.lastName) like lower(concat('%', :name, '%'))")
    List<Contact> findContactsByNameContains(@Param("name") String name);


}
