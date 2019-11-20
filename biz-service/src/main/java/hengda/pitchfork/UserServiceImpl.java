package hengda.pitchfork;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserServiceImpl extends UserGrpc.UserImplBase {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    @SuppressWarnings("unchecked")
    public void commonUserSignIn(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Connection conn = DBUtil.getConn();
            String sql = "select id, master_id, username, name, phone, " +
                    "(select v from public.common_data where id = u.master_id) as dept, " +
                    "(select super from cheliangduan.auth where master_id = u.id) as super " +
                    "from public.user as u " +
                    "where username = ? and password = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, body.get("username").toString());
            ps.setString(2, body.get("password").toString());
            ResultSet rs = ps.executeQuery();
            List<Map<String, Object>> result = DBUtil.getList(rs);
            if (result.size() != 1) {
                resp.put("message", "帐号或密码错误");
            } else {
                resp.put("content", result.get(0));
            }
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void list(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Connection conn = DBUtil.getConn();
            String sql = "select u.id, u.master_id, u.username, u.name, u.phone, u.remark, " +
                    "(select super from cheliangduan.auth as a where a.master_id = u.id) as super, " +
                    "(select v from public.common_data where id = u.master_id) as dept " +
                    "from public.user as u " +
                    "order by id desc";
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            resp.put("content", DBUtil.getList(rs));
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void get(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Connection conn = DBUtil.getConn();
            String sql = "select u.id, u.master_id, u.username, u.name, u.phone, u.remark, " +
                    "(select super from cheliangduan.auth where master_id = u.id) as super, " +
                    "(select v from public.common_data where id = u.master_id) as dept " +
                    "from public.user as u " +
                    "where id = ? " +
                    "limit 1";
            PreparedStatement ps = conn.prepareStatement(sql);
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Double id = Double.parseDouble(body.get("id").toString());
            ps.setInt(1, id.intValue());
            ResultSet rs = ps.executeQuery();
            resp.put("content", DBUtil.getMap(rs));
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void updatePassword(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Connection conn = DBUtil.getConn();
            String sql = "select password from public.user where id = ? limit 1";
            PreparedStatement ps = conn.prepareStatement(sql);
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Double id = Double.parseDouble(body.get("id").toString());
            ps.setInt(1, id.intValue());
            ResultSet rs = ps.executeQuery();
            Map<String, Object> data = DBUtil.getMap(rs);
            if (body.get("password").toString().equals(data.get("password").toString())) {
                sql = "update public.user set password = ? where id = ?";
                ps.clearParameters();
                ps = conn.prepareStatement(sql);
                ps.setString(1, body.get("password1").toString());
                ps.setInt(2, id.intValue());
                ps.execute();
            } else {
                resp.put("message", "当前密码输入错误");
            }
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void update(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Connection conn = DBUtil.getConn();
            String sql = "update public.user " +
                    "set username = ?, name = ?, phone = ?, master_id = ?, remark = ? " +
                    "where id = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            ps.setString(1, body.get("username").toString());
            ps.setString(2, body.get("name").toString());
            ps.setString(3, body.get("phone").toString());
            Double master_id = Double.parseDouble(body.get("master_id").toString());
            ps.setInt(4, master_id.intValue());
            ps.setString(5, body.get("remark").toString());
            Double id = Double.parseDouble(body.get("id").toString());
            ps.setInt(6, id.intValue());
            ps.execute();
            sql = "update cheliangduan.auth " +
                    "set super = ? " +
                    "where master_id = ?";
            ps.clearParameters();
            ps = conn.prepareStatement(sql);
            Double authSuper = Double.parseDouble(body.get("super").toString());
            ps.setInt(1, authSuper.intValue());
            ps.setInt(2, id.intValue());
            ps.execute();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void saveSignature(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

//        先判断signature表
        try {
            Connection conn = DBUtil.getConn();
            String sql = "select * from cheliangduan.signature where master_id = ? limit 1";
            PreparedStatement ps = conn.prepareStatement(sql);
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            logger.info("{}", body);
            Double id = Double.parseDouble(body.get("id").toString());
            ps.setInt(1, id.intValue());
            ResultSet rs = ps.executeQuery();
            List<Map<String, Object>> data = DBUtil.getList(rs);
            ps.clearParameters();
            if (data.size() == 1) {
                sql = "update cheliangduan.signature set data_url = ? where master_id = ?";
                ps = conn.prepareStatement(sql);
                ps.setString(1, body.get("data_url").toString());
                ps.setInt(2, id.intValue());
            } else {
                sql = "insert into cheliangduan.signature (master_id, data_url) values (?, ?)";
                ps = conn.prepareStatement(sql);
                ps.setInt(1, id.intValue());
                ps.setString(2, body.get("data_url").toString());
            }
            ps.execute();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
