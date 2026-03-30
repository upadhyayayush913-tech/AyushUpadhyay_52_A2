<?php
include 'db.php';

$id = $_GET['id'];
$result = $conn->query("SELECT * FROM student WHERE id=$id");
$row = $result->fetch_assoc();

if(isset($_POST['update'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $department = $_POST['department'];

    $conn->query("UPDATE student SET 
        name='$name', email='$email', mobile='$mobile', department='$department'
        WHERE id=$id");

    header("Location: index.php");
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Student</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

<div class="container mt-5">
    <div class="card shadow">
        <div class="card-header bg-warning text-dark">
            Edit Student
        </div>
        <div class="card-body">
            <form method="POST" class="row g-3">
                <div class="col-md-6">
                    <input type="text" name="name" value="<?php echo $row['name']; ?>" class="form-control">
                </div>
                <div class="col-md-6">
                    <input type="email" name="email" value="<?php echo $row['email']; ?>" class="form-control">
                </div>
                <div class="col-md-6">
                    <input type="text" name="mobile" value="<?php echo $row['mobile']; ?>" class="form-control">
                </div>
                <div class="col-md-6">
                    <input type="text" name="department" value="<?php echo $row['department']; ?>" class="form-control">
                </div>
                <div class="col-12 text-center">
                    <button type="submit" name="update" class="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    </div>
</div>

</body>
</html>