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
    public void superUserSignIn(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Connection conn = DBUtil.getConn();
            String sql = "select u.id, u.master_id, username, name, phone, " +
                    "(select v from public.common_data where id = u.master_id) as dept, " +
                    "a.super " +
                    "from public.user as u " +
                    "left join cheliangduan.auth as a on a.master_id = u.id " +
                    "where username = ? and password = ? and super = 1";
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
    public void save(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Connection conn = DBUtil.getConn();
            String sql = "insert into public.user " +
                    "(master_id, username, password, name, phone, remark, auth_super, position, pinyin)" +
                    "values (?, ?, ?, ?, ?, ?, 0, '', '') " +
                    "returning id";
            PreparedStatement ps = conn.prepareStatement(sql);
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Double master_id = Double.parseDouble(body.get("master_id").toString());
            ps.setInt(1, master_id.intValue());
            ps.setString(2, body.get("username").toString());
            ps.setString(3, body.get("password").toString());
            ps.setString(4, body.get("name").toString());
            ps.setString(5, body.get("phone").toString());
            ps.setString(6, body.get("remark").toString());
            ResultSet rs = ps.executeQuery();
            int id = Integer.parseInt(DBUtil.getMap(rs).get("id").toString());
            resp.put("content", id);
            sql = "insert into cheliangduan.auth " +
                    "(master_id, super) " +
                    "values (?, ?)";
            ps.clearParameters();
            ps = conn.prepareStatement(sql);
            ps.setInt(1, id);
            Double auth_super = Double.parseDouble(body.get("super").toString());
            ps.setInt(2, auth_super.intValue());
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
    public void get(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Connection conn = DBUtil.getConn();
            String sql = "select u.id, u.master_id, u.username, u.name, u.phone, u.remark, " +
                    "(select super from cheliangduan.auth where master_id = u.id) as super " +
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
    public void remove(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Connection conn = DBUtil.getConn();
            String sql = "delete from public.user where id = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Double id = Double.parseDouble(body.get("id").toString());
            ps.setInt(1, id.intValue());
            ps.execute();
            sql = "delete from cheliangduan.auth where master_id = ?";
            ps.clearParameters();
            ps = conn.prepareStatement(sql);
            ps.setInt(1, id.intValue());
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
