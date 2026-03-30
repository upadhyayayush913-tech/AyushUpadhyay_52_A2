<?php
include 'db.php';

if(isset($_POST['submit'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $department = $_POST['department'];

    $sql = "INSERT INTO student(name,email,mobile,department)
            VALUES('$name','$email','$mobile','$department')";
    $conn->query($sql);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Student CRUD</title>

    <!-- Bootstrap CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

<div class="container mt-5">

    <h2 class="text-center mb-4">Student Management System</h2>

    <!-- Form Card -->
    <div class="card shadow mb-4">
        <div class="card-header bg-primary text-white">
            Add Student
        </div>
        <div class="card-body">
            <form method="POST" class="row g-3">
                <div class="col-md-6">
                    <input type="text" name="name" class="form-control" placeholder="Enter Name" required>
                </div>
                <div class="col-md-6">
                    <input type="email" name="email" class="form-control" placeholder="Enter Email">
                </div>
                <div class="col-md-6">
                    <input type="text" name="mobile" class="form-control" placeholder="Enter Mobile">
                </div>
                <div class="col-md-6">
                    <input type="text" name="department" class="form-control" placeholder="Enter Department">
                </div>
                <div class="col-12 text-center">
                    <button type="submit" name="submit" class="btn btn-success px-4">Add Student</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Table Card -->
    <div class="card shadow">
        <div class="card-header bg-dark text-white">
            Student Records
        </div>
        <div class="card-body">

            <table class="table table-bordered table-hover text-center">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                <?php
                $result = $conn->query("SELECT * FROM student");

                while($row = $result->fetch_assoc()){
                    echo "<tr>
                        <td>{$row['id']}</td>
                        <td>{$row['name']}</td>
                        <td>{$row['email']}</td>
                        <td>{$row['mobile']}</td>
                        <td>{$row['department']}</td>
                        <td>
                            <a href='edit.php?id={$row['id']}' class='btn btn-warning btn-sm'>Edit</a>
                            <a href='delete.php?id={$row['id']}' class='btn btn-danger btn-sm' onclick='return confirm(\"Delete this record?\")'>Delete</a>
                        </td>
                    </tr>";
                }
                ?>
                </tbody>
            </table>

        </div>
    </div>

</div>

</body>
</html>